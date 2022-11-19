# Generated by Django 4.1 on 2022-11-19 21:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(max_length=50)),
                ('data', models.JSONField()),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accountOne', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account_one', to='api.account')),
                ('accountTwo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account_two', to='api.account')),
            ],
        ),
    ]