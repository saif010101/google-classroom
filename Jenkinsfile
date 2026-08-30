pipeline {
  agent any
  stages {
    stage('Invoke discord webhook url') {
      steps {
        sh """
        curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"content": "Hello from gitub/jenkins"}' \
        https://discordapp.com/api/webhooks/1543628171478437899/zcy5gPiNXNzB25y8UJdxCKLipmGD-U-Z1kfeZGvAlxED87RzRhYy7AHjMH8NqmNKF5Wu
        """
      }
    }
  }
}
