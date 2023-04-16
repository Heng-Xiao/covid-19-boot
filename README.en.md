# COVID-19-Boot

[![img](https://img.shields.io/badge/SpringBoot-%3E=2.3.7-green.svg)](https://spring.io/projects/spring-boot)  [![MyBatis-Plus Version badge](https://img.shields.io/badge/MyBatisPlus%20-3.3.2-blue)](https://mybatis.org/mybatis-3/zh/getting-started.html) [![img](https://img.shields.io/badge/Echats-%3E%3D%204.2.1-brightgreen)](https://echarts.apache.org/zh/index.html)

[中文](./README.md) | [preview](http://www.henglulu.top) | [Group chat](https://jq.qq.com/?_wv=1027&k=sLyuUZHU) | [Gitee](https://gitee.com/Heng-Xiao/covid-19-boot) | [Github](https://github.com/Heng-Xiao/covid-19-boot) 


💡 **「About ME」**

A flower may bloom again, but a man is never young again.

Hello, everyone. I am a post-00s rookie who graduated in 2022. I like to write blindly at ordinary times. 

**Currently open source, available for free learning and use. If sharing, please indicate the source. Thank you.** 

motto：Practice is diligent, shortage in one; Success depends on thought and ruin.

Because of love, so embrace the future.

Good things always happen in the next turn, I wish you all wish come true!!

## Platform introduction

[COVID-19-Boot](https://gitee.com/Heng-Xiao/covid-19-boot) The domestic epidemic big data visualization platform is mainly for more intuitive real-time attention and grasp the progress of novel coronavirus infected pneumonia epidemic prevention and control, more intuitive understanding of the national epidemic situation, timely and effective prevention and control measures. With the solution of data visualization technology, data information is not only targeted at decision makers, but also can be authorized to show to the public. We can use big data visualization to make it clearer To gain a more intuitive understanding of the current number of infected individuals across the country, in order to understand the changing trends of the epidemic.

This system adopts the [SpringBoot](https://spring.io/projects/spring-boot) architecture to develop web applications, uses [Echarts](https://echarts.apache.org/zh/index.html) to draw basic charts, and uses [MyBatis-Plus](https://mybatis.org/mybatis-3/zh/getting-started.html) to complete operations on MySQL databases.

💡 [COVID-19-Boot](https://gitee.com/Heng-Xiao/covid-19-boot) China Epidemic Visualization Platform Based on [SpringBoot](https://spring.io/projects/spring-boot). **Currently open source, available for free learning and use. If sharing, please indicate the source. Thank you.** 



* 🧑‍🤝‍🧑[Echarts](https://echarts.apache.org/zh/index.html) 、[Jquery](https://jquery.com/)、Ajax、HTML、CSS、and other technologies are used in the front end。
* 💡后端采用 Java 语言 [SpringBoot](https://spring.io/projects/spring-boot) 、[Spring](https://spring.io/projects/spring-framework)、[SpringMVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc)、[MyBatis-Plus](https://mybatis.org/mybatis-3/zh/getting-started.html) 等框架技术。

The backend adopts framework technologies such as Java language [SpringBoot](https://spring.io/projects/spring-boot),[Spring](https://spring.io/projects/spring-framework),[SpringMVC](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc),[MyBatis-Plus](https://mybatis.org/mybatis-3/zh/getting-started.html)  etc.



## Online experience

👩‍👧‍👦Demo address：[http://www.henglulu.top](http://www.henglulu.top) 

- Account number：admin 

- password：admin




## communication

- Learn to communicate with QQ groups：961263329     [Click here to join the group chat](https://jq.qq.com/?_wv=1027&k=sLyuUZHU)

- Welcome to follow my wechat public account

  <img src='src/main/resources/static/readmeimg/gzh.png' width='500'>


## Source address

gitee address(Main thrust)：[https://gitee.com/Heng-Xiao/covid-19-boot](https://gitee.com/Heng-Xiao/covid-19-boot)👩‍👦‍👦

github address：[https://github.com/Heng-Xiao/covid-19-boot](https://github.com/Heng-Xiao/covid-19-boot)👩‍👦‍👦



## Built-in function

1.  👨‍⚕️User login registration function: User login and email verification code registration function, login and email notification function.
2.  👨‍🎓Visual large screen display: data visualization platform for domestic epidemic situation and national risk area monitoring platform.
3.  👨‍🎓Background management of epidemic data: domestic epidemic data management, provincial epidemic data management, epidemic news data management, risk area data management, user management, etc.
4.  👨‍⚕️Scheduled task epidemic data crawler function: Use crontab scheduled task to run Python scripts to crawl epidemic data and store it in the MySQL database.


## Detailed structure

```
- src 
    - main 
        - java
            - com.xiao.covids Java code storage path
                - config Configuration class storage package
                - constant Constant class storage package
                - controller Controller
                - entity Entity class storage package
                - generator MyBatis Plus automatic generation class
                - interceptor Interceptor storage package
                - mapper Mapper storage bag
                - service service
                - util Tool class
                - CovidsApplication.java startup class
        - resources Page and resource storage path
            - mapper Mapper mapping file
            - static Static Resources
            - templates page
            - application.properties configuration system file
    - test
         - java
            - com.xiao.covids
                - CovidsApplicationTests.java Testing class
- target Compile files
- covid.sql Database Table Script
- pom.xml Maven configuration file
```



## Preparatory work
~~~
jdk >= 1.8 (Recommended version 1.8+)
Mysql >= 5.7.0 (Recommended version 5.7)
Idea >= 2021
Operating system (recommended Windows 10 version)
Maven >= 3.5.2(Recommended version 3.5+)
~~~

## readiness for operation♝

```bash
--1.Create a new database covid in the MySQL database

--2.Create a new database covid in the MySQL database and import the data from the covid.sql file into the database

--3.Load dependency packages in pom.xml

--4.Change the database username and password, as well as mailbox related configuration information, in the application.properties configuration file
# Configure database information
spring.datasource.url=jdbc:mysql://localhost:3306/covid?serverTimeZone=Shanghai&?useUnicode=true&characterEncoding=utf8&useSSL=false
spring.datasource.username=*******
spring.datasource.password=*******
#Email related configuration information
spring.mail.host=smtp.163.com
spring.mail.username=**********@163.com
spring.mail.password=**********
spring.mail.protocol=smtp
spring.mail.port=465

--5.Modify your email account in the Const.java constant class
public static final String EMAIL = "*********@qq.com";
```


### Accessing Projects

- Access address：[http://localhost](http://localhost) (The default address is port 80. If there are any modifications, please follow the configuration file)
- Account number：`admin` password：`admin`



## Demo diagram✅

### Login & Register

![image-01](src/main/resources/static/readmeimg/1.png)

![image-02](src/main/resources/static/readmeimg/2.png)

### Visualization large screen

![image-03](src/main/resources/static/readmeimg/3.jpg)

![image-04](src/main/resources/static/readmeimg/4.jpg)

![image-05](src/main/resources/static/readmeimg/5.jpg)

![image-06](src/main/resources/static/readmeimg/6.jpg)

![image-07](src/main/resources/static/readmeimg/7.jpg)

![image-08](src/main/resources/static/readmeimg/8.jpg)

![image-09](src/main/resources/static/readmeimg/9.jpg)

![image-10](src/main/resources/static/readmeimg/10.jpg)

![image-11](src/main/resources/static/readmeimg/11.jpg)

![image-12](src/main/resources/static/readmeimg/12.jpg)

### background management system

![image-13](src/main/resources/static/readmeimg/13.jpg)

![image-131](src/main/resources/static/readmeimg/131.jpg)

![image-14](src/main/resources/static/readmeimg/14.jpg)

![image-15](src/main/resources/static/readmeimg/15.jpg)

![image-16](src/main/resources/static/readmeimg/16.jpg)

![image-17](src/main/resources/static/readmeimg/17.jpg)

![image-18](src/main/resources/static/readmeimg/18.jpg)

![image-19](src/main/resources/static/readmeimg/19.jpg)

![image-20](src/main/resources/static/readmeimg/20.jpg)

![image-21](src/main/resources/static/readmeimg/21.jpg)


## Future plans

1.  👨‍⚕️Background management of epidemic data: Add crawler script information.
2.  👩‍⚕️Add Redis technology: optimize the time limit for visualizing large screen data queries and logging in, registering, and sending email verification codes.
3.  👨‍🎓Add Kafka technology: Write the crawled data into Kafka, and then consume the data, whether it is cleaning the data and storing it in the database or taking it out for some monitoring.
4.  👨‍🎓Timing task optimization: Write crontab timing tasks in Java code.

At present, due to my limited time and the opening of the COVID-19 epidemic, the data is no longer updated and maintained. I won't do these plans anymore. If you're interested, you can try making them yourself.