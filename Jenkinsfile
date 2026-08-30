pipeline {
  agent any
  stages {
    stage('Invoke discord webhook url') {
      steps {
        sh """
        curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"content": "Hello from gitub/jenkins"}' \
        discord_url
        """
      }
    }
  }
}
