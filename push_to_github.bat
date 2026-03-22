@echo off
git init
git add .
git commit -m "Deploy: Portfolio Completed"
git branch -M main
git remote remove origin
git remote add origin https://github.com/SHAHZAIB688/MyPortfolio.git
git push -u origin main --force
