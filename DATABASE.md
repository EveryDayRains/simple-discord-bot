# Создание кластера для базы данных

Для начала заходим на сайт https://mongodb.com и [Регистрируемся](https://account.mongodb.com/account/register) или [Входим](https://account.mongodb.com/account/login) в аккаунт.

После регистрации, вас перекинет на другую страничку. Вам необходимо нажать на зеленую кнопку, после в открывщимся окне написать название вашего проекта. Нажимаем на зеленую кнопку. 

![](https://imgs.mrlivixx.ml/opera_cuCMXaULuj.png)

Затем нам нужно создать кластер, для этого жмём на кнопку **Build a Cluster** и затем **Create cluster** Если хотите вы можете изменить название кластера. И ждём 1-5 минут.

Теперь нам нужно открыть раздел **Database Access**
![](https://imgs.mrlivixx.ml/opera_VFvHs0sXGW.png)

После перехода в данную вкладку, мы видем зеленую кнопку, с надписью **ADD NEW USER**, в открывшимся окне выставляем права "Atlas Admin". После пишите ваше имя и желаемый пароль(стоит понимать что, через эти данные вы будете входить в базу-данных. Так что запишите ваш пароль на листок или блокнот.) Сохраняем 
![](https://camo.githubusercontent.com/680a7a724d1b993eaa7301ecdb4ef4a5e04775c9/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3636373037323132333931343831333434342f3638363335333632373332303638303436372f494d475f32303230303330395f3034303432342e706e67)

Потом идём во вкладку **Network Access**
![](https://imgs.mrlivixx.ml/opera_PGfdBZDfX8.png)

Нажиманием на клопку **ADD IP ADDRESS** 
![](https://imgs.mrlivixx.ml/opera_IuLkQePeI6.png)

И кликаем на **ALLOW ACCESS FROM ANYWHERE** 
![](https://imgs.mrlivixx.ml/opera_1abHsyXZxs.png)

[🎉] Поздравляю! Мы создали базу, теперь нам необходима ссылка чтоб подключиться к базе. Для этого опять идем во вкладку Clusters.

![](https://imgs.mrlivixx.ml/opera_DtKoVpedMu.png)

И жмём на кнопку **CONNECT**
Дальше в появившемся окне жмём на **Connect your application** 
![](https://imgs.mrlivixx.ml/opera_yGeu800yF4.png)
Затем получаем ссылку на нашу базу данных, вместо <password> укажите пароль от пользователя и вместо <dbname> название базы которая будет юзать бота
![](https://imgs.mrlivixx.ml/opera_96XC9195k5.png)