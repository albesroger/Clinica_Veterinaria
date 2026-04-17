from django.contrib import admin
from .models import Owner, Pet, Appointment, ClinicalHistory

admin.site.register(Owner)
admin.site.register(Pet)
admin.site.register(Appointment)
admin.site.register(ClinicalHistory)
