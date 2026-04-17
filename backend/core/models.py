from django.db import models
from django.contrib.auth.models import User


class Owner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='owner_profile')
    phone = models.CharField(max_length=30, blank=True)
    address = models.CharField(max_length=255, blank=True)
    emergency_contact = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username}"


class Pet(models.Model):
    SPECIES_CHOICES = [
        ('dog', 'Perro'),
        ('cat', 'Gato'),
        ('bird', 'Ave'),
        ('rabbit', 'Conejo'),
        ('other', 'Otro'),
    ]
    SEX_CHOICES = [
        ('male', 'Macho'),
        ('female', 'Hembra'),
        ('unknown', 'Desconocido'),
    ]

    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=120)
    species = models.CharField(max_length=20, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=120, blank=True)
    sex = models.CharField(max_length=20, choices=SEX_CHOICES, default='unknown')
    birth_date = models.DateField(null=True, blank=True)
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    microchip_id = models.CharField(max_length=120, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.owner})"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Agendada'),
        ('confirmed', 'Confirmada'),
        ('completed', 'Completada'),
        ('canceled', 'Cancelada'),
    ]

    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='appointments')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='appointments')
    scheduled_at = models.DateTimeField()
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-scheduled_at']

    def __str__(self):
        return f"{self.pet.name} - {self.scheduled_at:%Y-%m-%d %H:%M}"


class ClinicalHistory(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='clinical_histories')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='clinical_histories')
    vet_name = models.CharField(max_length=120)
    visit_date = models.DateField()
    diagnosis = models.TextField(blank=True)
    treatment = models.TextField(blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-visit_date']

    def __str__(self):
        return f"{self.pet.name} - {self.visit_date:%Y-%m-%d}"
