#!/bin/bash


fnode(){
	cd client
	case $1 in
		"1")
			node index.js 4201 8081 0 0
			;;
		"2")
			node index.js 4202 8082 4 0
			;;
		"3")
			node index.js 4203 8083 4 8
			;;
		*)
			echo "Unrecognized argument for node"
			exit 1
			;;
	esac
}

fng(){
	cd client
	case $1 in
		"1")
			ng s --port 4201 -c dev1
			;;
		"2")
			ng s --port 4202 -c dev2
			;;
		"3")
			ng s --port 4203 -c dev3
			;;
		*)
			echo "Unrecognized argument for angular"
			exit 1
			;;
	esac
}

manager(){
	cd responsabile
	case $1 in
		"n")
			node index.js 4300 8090
			;;
		"a")
			ng s --port 4300
			;;
		*)
			echo "Unrecognized argument for manager (responsabile)"
			exit 1
			;;
	esac
}

if [ $# -lt 2 ]
then
	echo "Not enough arguments. Two required. Quitting"
	exit 1
fi

case $1 in
	"n")
		fnode $2
		;;
	"a")
		fng $2
		;;
	"r")
		manager $2
		;;
	*)
		echo "Unrecognized command. Quitting."
		;;
esac
