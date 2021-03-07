from django.http import JsonResponse
from rest_framework.authentication import TokenAuthentication,CSRFCheck,SessionAuthentication
from rest_framework.decorators import api_view,authentication_classes

# @api_view(['GET','POST'])
# @authentication_classes((SessionAuthentication))
# def AOIPolygon(request):
#     alldata={"test":"test"}
#     return JsonResponse(alldata)
