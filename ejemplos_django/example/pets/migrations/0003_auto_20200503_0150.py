# Generated by Django 3.0.4 on 2020-05-03 01:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('owners', '0001_initial'),
        ('pets', '0002_pet_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='owners.Owner'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='pet_type',
            field=models.CharField(max_length=80, null=True),
        ),
    ]
