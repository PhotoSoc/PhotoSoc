all:
	s3fs -o default_acl=public-read photosoc s3
	make s3/css/style.css
	make imgd
	make jsd
	s3cmd setacl S3://photosoc -P
	sleep 5; sudo umount s3
me:
	@if [[ $EUID -ne 0 ]]; then echo "What? Make it yourself.";\
	else echo "Okay."; fi
a:
	@echo > /dev/null
sandwich:
	@echo > /dev/null
s3/css/style.css: css/style.less
	lessc css/style.less > s3/css/style.css
imgd: img
	rm -rf s3/img
	cp -r img s3
jsd: js
	rm -rf s3/js
	cp -r js s3
