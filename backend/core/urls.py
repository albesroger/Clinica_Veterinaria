from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import OwnerViewSet, PetViewSet, AppointmentViewSet, ClinicalHistoryViewSet

router = DefaultRouter()
router.register(r'owners', OwnerViewSet, basename='owner')
router.register(r'pets', PetViewSet, basename='pet')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'clinical-histories', ClinicalHistoryViewSet, basename='clinical-history')

urlpatterns = [
    path('', include(router.urls)),
]
