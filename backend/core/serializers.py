from rest_framework import serializers
from .models import Owner, Pet, Appointment, ClinicalHistory


class OwnerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Owner
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'phone',
            'address',
            'emergency_contact',
            'notes',
        ]


class PetSerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(source='owner.id', read_only=True)
    owner_name = serializers.CharField(source='owner.user.get_full_name', read_only=True)

    class Meta:
        model = Pet
        fields = [
            'id',
            'owner_id',
            'owner_name',
            'name',
            'species',
            'breed',
            'sex',
            'birth_date',
            'weight_kg',
            'microchip_id',
            'notes',
        ]


class AppointmentSerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(source='owner.id', read_only=True)
    owner_name = serializers.CharField(source='owner.user.get_full_name', read_only=True)
    pet_name = serializers.CharField(source='pet.name', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'owner_id',
            'owner_name',
            'pet',
            'pet_name',
            'scheduled_at',
            'reason',
            'status',
            'notes',
        ]

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request and not request.user.is_staff:
            fields['status'].read_only = True
        return fields


class ClinicalHistorySerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(source='owner.id', read_only=True)
    owner_name = serializers.CharField(source='owner.user.get_full_name', read_only=True)
    pet_name = serializers.CharField(source='pet.name', read_only=True)

    class Meta:
        model = ClinicalHistory
        fields = [
            'id',
            'owner_id',
            'owner_name',
            'pet',
            'pet_name',
            'vet_name',
            'visit_date',
            'diagnosis',
            'treatment',
            'notes',
        ]
