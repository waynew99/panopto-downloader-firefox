import requests
import urllib3

from bs4 import BeautifulSoup as bs


# course folder link https://midd.hosted.panopto.com/Panopto/Pages/Sessions/List.aspx#folderID=%2229c38842-a32b-487e-a4ac-ae3c00f4f7f7%22
folder_link = "https://midd.hosted.panopto.com/Panopto/Pages/Sessions/List.aspx#folderID=%2229c38842-a32b-487e-a4ac-ae3c00f4f7f7%22"
response = requests.get(folder_link)

print("Lec2" in str(response.content))
