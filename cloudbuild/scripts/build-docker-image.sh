echo
echo "************************"
echo "* Build container *"
echo "************************"
echo

cd /workspace
docker build -f docker/live.Dockerfile \
    -t $4-docker.pkg.dev/$1/$5/$2:$3 .

echo
echo "************************"
echo "* Push to Registry *"
echo "************************"
echo

docker push $4-docker.pkg.dev/$1/$5/$2:$3