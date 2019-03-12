set MONGO_HOME=C:\Program Files\MongoDB\Server\4.0
set MONGO_DAEMON=%MONGO_HOME%\bin\mongod.exe
set MONGO_DATA_PATH=%HOMEDRIVE%%HOMEPATH%\MongoDB\db
set MONGO_LOG_PATH=%HOMEDRIVE%%HOMEPATH%\MongoDB\log
set MONGO_CONFIG=%HOMEDRIVE%%HOMEPATH%\MongoDB\mongod.cfg
REM except mongo doesn't substitute env vars in the config
REM ...yet: https://stackoverflow.com/questions/30002680/is-it-possible-to-add-environment-variables-to-mongodb-config-file

start "MongoDB" "%MONGO_DAEMON%" --config %MONGO_CONFIG%