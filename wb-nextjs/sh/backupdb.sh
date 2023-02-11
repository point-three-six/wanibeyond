#!/bin/bash
mysqldump --user=root --password=psswd --all-databases > /mnt/waniplus_sql_backups/backup_$(date +%F.%H%M%S).sql