pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1' // Cambia según tu región
        S3_BUCKET = 'sitio-estatico-devops' // Cambia por tu bucket S3
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clona el repositorio
                git branch: 'main', url: 'https://github.com/Chrystian22/Formulario.git'
            }
        }

        stage('Build') {
            steps {
                // Construye el proyecto (opcional, depende del lenguaje)
                bat 'echo "Construcción completada con exito"'
            }
        }

        stage('Upload to S3') {
            steps {
                withAWS(region: "${AWS_REGION}", credentials: 'aws-credentials-id') {
                    s3Upload(bucket: "${S3_BUCKET}", includePathPattern: '**/*', workingDir: '.')
                }
            }
        }
    }
}
