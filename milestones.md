#Milestones

Here are the major milestones for this project:

1. read all files in directory A
2. make md5 of each file (but not directories)
3. store file info + md5 hash in a SQLite database
4. read all files in directory B
5. make md5 of each file and compare hash with db-stored hash
6. report if duplicate is found
7. profit! *

Step 1-3 are non-controversial, but step 4-6 may be solved in different ways depending on what is the most efficient solution.
Maybe there should be different ways of doing it, depending if the user has a lot of disk space, or if disk space is sparse… 
We'll see! :D

Check this one to find file stats: https://nodejs.org/api/fs.html > Class: fs.Stats

\* If you like my work and want me to continue, consider donating to 1Dzh4YhhCiCRUQMPNcps9LwVQbvfXaPVdM
