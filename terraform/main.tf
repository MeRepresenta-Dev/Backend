
provider "aws" {
  region = var.region
}

terraform {
  backend "s3" {
    bucket = "terraform-backend-ecs"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
