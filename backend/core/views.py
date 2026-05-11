from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from .models import Owner, Pet, Appointment, ClinicalHistory
from .serializers import OwnerSerializer, PetSerializer, AppointmentSerializer, ClinicalHistorySerializer


def get_owner_for_user(user):
    try:
        return user.owner_profile
    except Owner.DoesNotExist:
        return None


class IsOwnerOrStaff(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Staff users have full access
        if request.user.is_staff:
            return True

        owner = get_owner_for_user(request.user)
        if owner is None:
            return False

        # If the object has an `owner` FK (Pet, Appointment, ClinicalHistory)
        if hasattr(obj, 'owner'):
            try:
                return int(getattr(obj, 'owner_id', None)) == int(owner.id)
            except Exception:
                return False

        # If the object is an Owner instance, compare ids
        try:
            return int(getattr(obj, 'id', None)) == int(owner.id)
        except Exception:
            return False


class OwnerViewSet(viewsets.ModelViewSet):
    serializer_class = OwnerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Owner.objects.select_related('user').all()
        owner = get_owner_for_user(self.request.user)
        return Owner.objects.select_related('user').filter(id=owner.id) if owner else Owner.objects.none()


class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        if self.request.user.is_staff:
            qs = Pet.objects.select_related('owner', 'owner__user').all()
            breed = self.request.query_params.get('breed')
            species = self.request.query_params.get('species')
            if breed:
                qs = qs.filter(breed__icontains=breed)
            if species:
                qs = qs.filter(species__iexact=species)
            return qs
        owner = get_owner_for_user(self.request.user)
        qs = Pet.objects.select_related('owner', 'owner__user').filter(owner=owner) if owner else Pet.objects.none()
        breed = self.request.query_params.get('breed')
        species = self.request.query_params.get('species')
        if breed:
            qs = qs.filter(breed__icontains=breed)
        if species:
            qs = qs.filter(species__iexact=species)
        return qs

    def perform_create(self, serializer):
        if self.request.user.is_staff and self.request.data.get('owner'):
            owner = Owner.objects.filter(id=self.request.data.get('owner')).first()
            if not owner:
                raise ValidationError({'owner': 'Owner no encontrado.'})
            serializer.save(owner=owner)
            return
        owner = get_owner_for_user(self.request.user)
        if owner is None:
            raise ValidationError({'owner': 'El usuario no tiene perfil de dueño.'})
        serializer.save(owner=owner)


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Appointment.objects.select_related('owner', 'owner__user', 'pet').all()
        owner = get_owner_for_user(self.request.user)
        return Appointment.objects.select_related('owner', 'owner__user', 'pet').filter(owner=owner) if owner else Appointment.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_staff and self.request.data.get('owner'):
            owner = Owner.objects.filter(id=self.request.data.get('owner')).first()
            if not owner:
                raise ValidationError({'owner': 'Owner no encontrado.'})
        else:
            owner = get_owner_for_user(self.request.user)
            if owner is None:
                raise ValidationError({'owner': 'El usuario no tiene perfil de dueño.'})

        pet = serializer.validated_data.get('pet')
        if pet.owner_id != owner.id:
            raise ValidationError({'pet': 'La mascota no pertenece al dueño.'})

        serializer.save(owner=owner)


class ClinicalHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = ClinicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        if self.request.user.is_staff:
            return ClinicalHistory.objects.select_related('owner', 'owner__user', 'pet').all()
        owner = get_owner_for_user(self.request.user)
        return ClinicalHistory.objects.select_related('owner', 'owner__user', 'pet').filter(owner=owner) if owner else ClinicalHistory.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_staff and self.request.data.get('owner'):
            owner = Owner.objects.filter(id=self.request.data.get('owner')).first()
            if not owner:
                raise ValidationError({'owner': 'Owner no encontrado.'})
        else:
            owner = get_owner_for_user(self.request.user)
            if owner is None:
                raise ValidationError({'owner': 'El usuario no tiene perfil de dueño.'})

        pet = serializer.validated_data.get('pet')
        if pet.owner_id != owner.id:
            raise ValidationError({'pet': 'La mascota no pertenece al dueño.'})

        serializer.save(owner=owner)
