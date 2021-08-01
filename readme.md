baixar e instalar o mongodb no computador através do link: https://www.mongodb.com/try/download/community

Pelo prompt de comando, entre na subpasta bin que fica dentro da pasta de instalação do seu MongoDB e digite o comando abaixo, substituindo o caminho passado ao executável pelo caminho até a pasta data do seu projeto (que você pode criar agora, caso ainda não tenha feito). Repare que em ambientes Unix, o executável deve ser chamado como ./mongod, sendo que no Windows é apenas mongod, como abaixo.

mongod --dbpath c:/projects/series-api/data

