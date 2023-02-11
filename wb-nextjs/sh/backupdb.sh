#!/bin/bash
mysqldump --user=root --password="8L8Ed@9O7&l0" --all-databases > /mnt/waniplus_sql_backups/backup_$(date +%F.%H%M%S).sql