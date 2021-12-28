#!/bin/bash
rm -fr ./dist/*
ng build --prod --base-href https://bayer-nutricao-materna.com.br/mailservice/

echo " "
echo "Removendo arquivos antigos"
ssh -i DataCoreDemo.pem ec2-user@18.229.103.126<<EOF
sudo rm -fr /var/www/html/mailservice/*
EOF

echo " "
echo "Copiando arquivos para PROD"
scp -i DataCoreDemo.pem -r ./dist/* ec2-user@18.229.103.126:/var/www/html/mailservice/
scp -i DataCoreDemo.pem -r ./.htaccess ec2-user@18.229.103.126:/var/www/html/mailservice/
