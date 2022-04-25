#!/bin/bash 
set -x

sudo apt-get update
sudo apt-get install -y nfs-kernel-server
sudo mkdir -p /opt/keys/flagdir
sudo chown nobody:nogroup /opt/keys
sudo chmod -R a+rwx /opt/keys

hostname > /opt/keys/headnode
sed -i "s/KUBEHEAD/$(cat /opt/keys/headnode)/g" /etc/docker/daemon.json
sudo systemctl daemon-reload
sudo systemctl restart docker

# Create the permissions file for the NFS directory.
computes=$(($1 + 1))
for i in $(seq 2 $computes)
do
  echo "/opt/keys 192.168.1.$i(rw,sync,no_root_squash,no_subtree_check)" | sudo tee -a /etc/exports
done

sudo systemctl restart nfs-kernel-server

kubeadm init > /opt/keys/kube.log
sudo touch /opt/keys/kube_done


# the username needs to be changed
while IFS= read -r line; do
  mkdir -p /users/$line/.kube
  sudo cp -i /etc/kubernetes/admin.conf /users/$line/.kube/config
  sudo chown $line: /users/$line/.kube/config
done < <( ls -l /users | grep 4096 | cut -d' ' -f3 )

sudo -H -u lngo kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')" 
