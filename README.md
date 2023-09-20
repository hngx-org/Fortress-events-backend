# Team Fortress (Backend)

## Requisites

Node and npm

## Initial setup 1




Install all modules

npm install

# SetUp with cloud database
cp .env_example .env


-----------------------------------------------------------------------------
-----------------------------------------------------------------------------

## Setup local environment variables

```
cp .env_sample .env
```

## Database

You need to setup a MySQL instance yourself, the default database name is: `fortress_db` 
DB schemas are automatically synced



## Easily testing server endpoints

Make use of POSTMAN to test your endpoints extensively




### Install MySQL


# Linux Shells
```sh
sudo apt update
sudo apt install mysql-server
```


# Windows (Don't know much about windows so please read on the installation process)

```sh
Visit https://dev.mysql.com/downloads/installer/
```

# After Installation(Linux) Start the Mysql service

```sh
sudo systemctl start mysql

sudo mysql
```

```sql
CREATE USER 'fortress'@'localhost' IDENTIFIED BY 'f0rtr355';

GRANT ALL PRIVILEGES ON *.* TO 'fortress'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

exit
```

```
mysql -u fortress -p (enter)
#when prompted for password use the password f0rtr355 set above
```

```sql
CREATE DATABASE fortress_db;
```


----------------------------------------------------------------------------
----------------------------------------------------------------------------
## Run the server

```
npm run build
```
