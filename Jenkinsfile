pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = 'your-netlify-site-id'
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/rhrits/coin-tap-game.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Use Node.js
                    nodejs('Node 16.x') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build the project
                    nodejs('Node 16.x') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Deploy to Netlify') {
            steps {
                script {
                    // Deploy build folder to Netlify
                    sh '''
                    curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
                         -H "Content-Type: application/zip" \
                         --data-binary "@build.zip" \
                         https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
