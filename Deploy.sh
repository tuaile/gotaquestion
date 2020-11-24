#run this in gitbash in windows
mysql -u root -e 'drop database gotaquestion'
mysql -u root -e 'create database gotaquestion'
mysql -u root gotaquestinon < gotaquestion.sql 

#server
php -S localhost:8888
