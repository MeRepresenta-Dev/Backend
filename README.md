![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiL3JZVlczcnJ5bTVmNW9DemwycEF0cGxHdW9OcHZHUXJLdG9ORzJqTHVtN1F5SFJ6U1BHdmVPUlpSc0hRaGxYSE00SnVRSmp6Mjk2eFcrZ2dKSXJJYjljPSIsIml2UGFyYW1ldGVyU3BlYyI6IlFXdmdHaXhYYWVGZDZOeVkiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

# Backend

- Temos de infra em geral:
  1 aplicação de back-end, NodeJS (api.merepresenta.org.br)
  1 aplicação front-end ReactJS, (app.merepresenta.org.br)
  1 aplicação front-end GatsbyJS, (eleitor.merepresenta.org.br)

  Os front-ends estão sendo utilizados em sua versão de produção (formato de build, apenas os arquivos estáticos)

  Todos os repositórios do Github estão com deploy automático para os respectivos recursos de infra. Em suas branches default.

  Em termos de recurso da AWS Temos

  AWS SNS - Disparo de SMS
  AWS SES - Disparo de e-mails
  AWS S3 - Armazenamento de arquivos (imagens do upload)

  Todas as aplicações tem os seus logs sendo armazenados no AWS Cloudwatch.

  Termos de escalabilidade, hoje, as aplicações estão com o minimo necessário para ficarem de pé. Sendo assim, hoje não suportam um alto pico de uso sem uma configuração dentro da AWS.

  Então em momentos de alto pico de uso, precisa ser feito esse ajuste (dependendo do tamanho do pico esperado)

  Todos os dominios estão cobertos por um certificado SSL, que garante o uso do HTTPS (site seguro)

  O site merepresenta.org.br está sendo puxado do SquareSpace (onde fiz uma configuração acompanhada do Angelo)

  O dominio pode segurar outros subdominios no futuro, como por ex: candidato.merepresenta.org.br, teste.merepresenta.org.br


 - Infra do back-end: pode ser utilizada para qualquer tecnologia ou linguagem de programação, desde que seja escrito um Dockerfile como é esperado o comportamento da aplicação.


  Termos de back-end 

  - Disparo de e-mails pela biblioteca nodemailer
  - Disparo de sms pelo aws-sdk 
  - Manipulação dos arquivos pela biblioteca multer




