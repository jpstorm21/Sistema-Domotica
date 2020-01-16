import sys
import requests

if (len(sys.argv) < 3):
  print('Error')
  sys.exit()

try:
  rut = sys.argv[1]
  password = sys.argv[2]

  rut = rut.replace('.', '')
  rut = rut.replace('-', '')

  dv = rut[-1:].upper()

  rutn = rut[:-1]
  ruts = '-'.join(('{:,}'.format(int(rutn)).replace(',', '.'), dv))

  data = {
    'cod': '',
    'origen': 'academico',
    'rut': rutn,
    'dv': dv,
    'rut_aux': ruts,
    'clave': password,
    'Ingresar.x': '71',
    'Ingresar.y': '19'
  }

  headers = {
    'Cache-Control': 'no-cache',
    'Referer': 'https://online.ucn.cl/onlineucn/',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:28.0) Gecko/20100101 Firefox/28.0'
  }

  url = 'https://online.ucn.cl/onlineucn/Servicio.asp'

  r = requests.post(url, data=data, headers=headers, allow_redirects=False)

  loginOK = False

  if 'Location' in r.headers:
    location = r.headers['Location'].find('servicio.asp')
    loginOK = (location != -1)

  print(loginOK)
except ValueError:
  print(False)