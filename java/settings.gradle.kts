pluginManagement {
  repositories {
    gradlePluginPortal()
    mavenCentral()
  }
}

dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    mavenCentral()
    mavenLocal()
  }
}

rootProject.name = "runapi-flux-kontext-java"

include("runapi-core")
include("runapi-flux-kontext")
