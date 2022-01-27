//Countdown Timer
const clockdiv = document.getElementById("countdown");
const countDownTime = new Date(
  clockdiv.getAttribute("data-date")
).getTime();

const countdownfunction = setInterval(function () {
  let now = new Date().getTime();
  let diff = countDownTime - now;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  let minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
  let seconds = Math.floor(diff % (1000 * 60) / 1000);
  if(days < 10){
    days = "0" + days;
  }
  if(hours < 10){
    hours = "0" + hours;
  }
    if(minutes < 10){
      minutes = "0" + minutes;
    }
      if(seconds < 10){
        seconds = "0" + seconds;
      }
  if (diff < 0) {
    clockdiv.style.display = "none";
    clearInterval(countdownfunction);
  } else {
    clockdiv.querySelector(".days").innerHTML = days;
    clockdiv.querySelector(".hours").innerHTML = hours;
    clockdiv.querySelector(".minutes").innerHTML = minutes;
    clockdiv.querySelector(".seconds").innerHTML = seconds;
  }
  
}, 1000);


// METAMASK CONNECTION
window.addEventListener('DOMContentLoaded', () => {
  const onboarding = new MetaMaskOnboarding();
  const onboardButton = document.getElementById('connectWallet');
  let accounts;

  const updateButton = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboardButton.innerText = 'Install MetaMask!';
      onboardButton.onclick = () => {
        onboardButton.innerText = 'Connecting...';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
      };
    } else if (accounts && accounts.length > 0) {
      onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
      onboardButton.disabled = true;
      onboarding.stopOnboarding();
    } else {
      onboardButton.innerText = 'Lets connect you!MM';
      onboardButton.onclick = async () => {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        .then(function(accounts) {
          onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
          window.alert("You have successfully connected to metamask..May be if you have another crypto wallet , It should pop up dont get bothered, You have chosen metamask")
          onboardButton.disabled = true;

        });
      };
    }
  };

  updateButton();
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    window.ethereum.on('accountsChanged', (newAccounts) => {
      accounts = newAccounts;
      updateButton();
    });
  }
});