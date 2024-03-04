pipeline {
    agent any

    stages {

        stage('mouving to back_end') {
            steps {
                script {
                    echo "mouving to backend "
                    sh 'cd BackEnd'
                   

                }
            }
        }
        stage('Install dependencies') {
steps{
script {
sh('npm install')
}
}
}
        stage('Unit Test') {
steps{
script {
sh('npm test')
}
}
}

        stage('Build application') {
steps{
script {
sh('npm run build-dev')
}
}
}

    
    
    
    
    
    }}

