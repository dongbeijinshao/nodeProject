在mac终端当前文件夹下执行如下命令，便可生成私钥、公钥，为了配置token

私钥生成 openssl genrsa -out rsa_private_key.pem 1024
公钥生成 openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem