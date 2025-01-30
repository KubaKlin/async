// 1
function waitForAnyButtonToBeClicked(firstSelector, secondSelector) {
  return new Promise(function (resolve, reject) {
    const firstButton = document.querySelector(firstSelector);
    const secondButton = document.querySelector(secondSelector);
    if (!secondButton || !firstButton) {
      reject();
    }
    if (firstButton) {
      firstButton.addEventListener('click', function () {
        resolve(firstButton);
      });
    }
    if (secondButton) {
      secondButton.addEventListener('click', function () {
        resolve(secondButton);
      });
    }
  });
}

waitForAnyButtonToBeClicked('#first-button', '#second-button')
  .then(function (clickedButton) {
    console.log('A button was clicked', clickedButton);
  })
  .catch(function () {
    console.log('One of the buttons does not exist');
  });

// 2
function waitForPasswordsToMatch(firstSelector, secondSelector) {
  return new Promise(function (resolve, reject) {
    const passwordInputs = document.querySelectorAll('.password-input');

    passwordInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        const firstInput = document.querySelector(firstSelector);
        const secondInput = document.querySelector(secondSelector);

        if (!firstInput || !secondInput) {
          reject();
        } else {
          const firstInputValue = firstInput.value;
          const secondInputValue = secondInput.value;
          const inputsMatch = firstInputValue === secondInputValue;

          if (
            inputsMatch &&
            secondInputValue !== '' &&
            firstInputValue !== ''
          ) {
            resolve();
          }
        }
      });
    });
  });
}

waitForPasswordsToMatch('#password-inputss', '#confirm-password-input')
  .then(function () {
    console.log('Passwords match');
  })
  .catch(function () {
    console.log('Passwords doesn`t match or are missing');
  });
