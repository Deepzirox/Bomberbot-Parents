# Generated by Django 3.1.2 on 2020-10-12 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdviceModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('advice_ok', models.TextField(blank=True, null=True, verbose_name='Congratulations')),
                ('advice_mid', models.TextField(blank=True, null=True, verbose_name='Advice')),
                ('advice_urgent', models.TextField(blank=True, null=True, verbose_name='Urgent advice')),
            ],
        ),
    ]
