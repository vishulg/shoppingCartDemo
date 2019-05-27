# Shopping Cart Demo

Shopping Cart Demo is a Component made in React.

## Requirements

Node Version: 10.15.1

Npm Version: 5.4.1

## Installation

```bash
git clone https://github.com/vishulg/shoppingCartDemo.git
```

Or Download clicking [here](https://github.com/vishulg/shoppingCartDemo/archive/master.zip)

Once Clone or downloaded use following commands:

```bash
npm install 
npm start
```

## Note

In linux machine if you get error: System Limit for number of file watches exceed, Run following command then npm start

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

cat /proc/sys/fs/inotify/max_user_watches

fs.inotify.max_user_watches=524288
```

## Author
Vishul