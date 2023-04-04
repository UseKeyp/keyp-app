(NOTE: Below is untested, but potentially useful.)
## Installing and configuring Postgres

Run the following in a terminal:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
```

Switch to the postgres user, and create the orthoverse user with a strong password, like `orthoverse`, and the Orthoverse database:

```
sudo -i -u postgres
createuser -P -s -e orthoverse
createdb -O orthoverse orthoverse
```

Install DBeaver so you can see what is going on. Download it from [their website](https://dbeaver.io/download)

Remember that a .deb package is installed with `sudo dpkg -i <package name>`

Finally, perform the first migration to make sure the database has the right tables:

```
yarn rw prisma migrate dev
```
