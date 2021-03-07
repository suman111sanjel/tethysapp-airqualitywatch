from django.shortcuts import render
from ..config import initilizationData

def Recent(request):
    """
    Controller for the app home page.
    """

    context = {
        'CountryName':initilizationData['country'],
        'navLogoImage':initilizationData['navLogoImage'],
        'defaultView':initilizationData['defaultView'],
        'TethysAppName':initilizationData['TethysAppName'],
        'AdminLevel':initilizationData['AdminLevel'],
        'regionOrCountryId':initilizationData['regionOrCountryId'],
    }
    return render(request, 'airqualitywatch/recent_AirQualityWatch.html', context)


def Archive(request):
    """
    Controller for the app home page.
    """

    context = {
        'CountryName':initilizationData['country'],
        'navLogoImage':initilizationData['navLogoImage'],
        'defaultView':initilizationData['defaultView'],
        'TethysAppName':initilizationData['TethysAppName'],
        'AdminLevel':initilizationData['AdminLevel'],
        'regionOrCountryId':initilizationData['regionOrCountryId'],
    }

    return render(request, 'airqualitywatch/archive_AirQualityWatch.html', context)




def Forecast(request):
    """
    Controller for the app home page.
    """

    context = {
        'CountryName':initilizationData['country'],
        'navLogoImage':initilizationData['navLogoImage'],
        'defaultView':initilizationData['defaultView'],
        'TethysAppName':initilizationData['TethysAppName'],
        'AdminLevel':initilizationData['AdminLevel'],
        'regionOrCountryId':initilizationData['regionOrCountryId'],
    }

    return render(request, 'airqualitywatch/forecast_AirQualityWatch.html', context)
