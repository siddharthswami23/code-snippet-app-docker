def call(){
  echo "demo curl command using jenkins"
  echo "summoning rick for 5 secconds"
  bat "curl --max-time 5 ascii.live/rick"
}
