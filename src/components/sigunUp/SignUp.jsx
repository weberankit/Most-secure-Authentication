import React, { useState } from 'react';
import InitSignup from './InitSignup';
import FinishSignup from './FinishSignup';

function SignUpPage() {
  //to check otp page provide mock value her like 123
  const [tempID, setTempID] = useState(null); //to check otp page use useState(123)

  return (
    <div >
      <div >
        {!tempID ? (
          <InitSignup setTempID={setTempID} />
        ) : (
          <FinishSignup tempID={tempID} />
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
