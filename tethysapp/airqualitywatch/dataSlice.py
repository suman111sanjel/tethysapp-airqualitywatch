# -*- coding: utf-8 -*-
"""
Created on Mon Jan  4 20:18:14 2021

@author: sdahal
"""
import requests
import datetime
import xml.etree.ElementTree as ET



def SliceFromCatalog(url, data_ext, startDate, endDate):
    '''
    Args:
        url: catalog url
        data_ext: file extension
        startDate: start date for slice
        endDate: end date for slice

    Returns: list of sliced
    '''

    # html = parse(url).getroot()
    # list = []
    # for count in html.cssselect('a'):
    #     l = count.text_content()
    #     list.append(l)

    tree = ET.fromstring(requests.get(url).text)
    list = []

    for c in tree.iter():
        l = c.get('name')
        list.append(l)

    new = [x for x in list if (x is None) == False]
    new_list = []
    for l in filter(lambda x: x.endswith(data_ext), new):
        new_list.append(l)

    final = []
    prefix = new_list[0].split('-2')[0]
    check = (new_list[0])[-12]
    if(startDate[-9]=='-' and endDate[-9]=='-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d-%H-%M')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d-%H-%M')
    elif(startDate[-9]=='-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d-%H-%M')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d')
    elif(endDate[-9]=='-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d-%H-%M')
    else:
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d')

    if check == '-':
        for i in range(len(new_list)):
            x = new_list[i][-19:-3]
            if (x >= startDate.strftime("%Y-%m-%d-%H-%M") and x <= endDate.strftime("%Y-%m-%d-%H-%M")):
                y = prefix + "-" + x + data_ext
                final.append(y)
    else:
        for i in range(len(new_list)):
            x = new_list[i][-13:-3]
            if (x >= startDate.strftime("%Y-%m-%d") and x <= endDate.strftime("%Y-%m-%d")):
                y = prefix + "-" + x + data_ext
                final.append(y)

    final.sort()
    print(final)
    return final


url = "http://110.34.30.197:8080/thredds/catalog/hkhairqualitywatch/RecentAndArchive/PM/GEOS-PM2p5/Archive/catalog.xml"
data_ext = ".nc"
endDate = '2020-12-13'
startDate = '2020-12-08-12-30'
SliceFromCatalog(url, data_ext, startDate, endDate)
