import math

from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from owners.models import Owner
from owners.serializers import OwnerSerializer


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='OwnerPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                    # 'bulk_happy_birthday': lambda user, req: user.is_authenticated,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': True,
                    'update': True,
                    # 'update_permissions': 'users.add_permissions'
                }
            }
        ),
    )
