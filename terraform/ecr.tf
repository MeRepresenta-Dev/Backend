resource "aws_ecr_repository" "this" {
  name = "${local.app_name}-repository"
}

resource "null_resource" "docker" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    working_dir = var.app_folder
    command     = "$(aws ecr get-login --no-include-email --region ${var.region})"
  }

  provisioner "local-exec" {
    working_dir = var.app_folder
    command     = "docker build -t ${local.app_name}:${var.tag} ."
  }

  provisioner "local-exec" {
    working_dir = var.app_folder
    command     = "docker tag ${local.app_name}:${var.tag} ${aws_ecr_repository.this.repository_url}:${var.tag}"
  }

  provisioner "local-exec" {
    working_dir = var.app_folder
    command     = "docker push ${aws_ecr_repository.this.repository_url}:${var.tag}"
  }
}
