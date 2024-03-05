pipeline {
    agent any

    stages {

        stage('Install dependencies') {
steps{
script {
     dir('BackEnd') {
                    sh 'npm install'
                }

}
}
}
        stage('Unit Test') {
steps{
script {
    dir('BackEnd/test') {
        sh "pwd"
sh('npm test')
}
}
}
}

        stage('Build application') {
steps{
script {
    dir('BackEnd') {
sh('npm run build-dev')
    }
}
}
}

    
    
    
    
    
    }}

