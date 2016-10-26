FROM virusvn/docker-centos-v8js:nginx-php-fpm

RUN yum install -y php-mysqli vim

RUN cd /tmp \
	&& curl -LO http://wordpress.org/latest.tar.gz \
	&& tar xvzf /tmp/latest.tar.gz -C /var/www/html --strip-components=1 \
	&& rm /tmp/latest.tar.gz

COPY start.sh /usr/local/bin/
COPY nginx/wordpress.conf /etc/nginx/conf.d
COPY wp-config.php /var/www/html/

RUN chown -R apache:apache /var/www/
RUN chmod -R 0775 /var/www

RUN rm /etc/nginx/conf.d/default.conf

RUN chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]
