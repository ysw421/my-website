import { useEffect, useState } from 'react';
import { InlineMath } from 'react-katex';

import 'katex/dist/katex.min.css';

import ColorLink from '@/components/ColorLink';
import Paper from '@/components/Paper';
import { Box, ImageBox, SubTitle } from '@/components/utilities';

export default function AsciiCode() {
  const [asciiBoxText, setAsciiBoxText] = useState<string>('Hello');
  const [asciiBoxTextAscii, setAsciiBoxTextAscii] = useState<string>('');

  useEffect(() => {
    let output = '';
    for (let i = 0; i < asciiBoxText.length; i++) {
      const asciiCode = asciiBoxText[i].charCodeAt(0);
      const binary = asciiCode.toString(2);
      const binaryWithZero = binary.padStart(7, '0');
      const ParityBit =
        (binaryWithZero.split('1').length - 1) % 2 === 0 ? '0' : '1';
      output += ' ' + binaryWithZero + ParityBit;
    }
    setAsciiBoxTextAscii(output);
  }, [asciiBoxText]);

  function isAscii(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (str[i].charCodeAt(0) > 127) {
        return false;
      }
    }
    return true;
  }

  return (
    <Paper title='글자를 나타내다, 아스키코드와 유니코드'>
      <p>
        우리가 컴퓨터로 메일을 보낼 때, 궁금한 것을 포털 사이트에 검색할 때, 이
        글에서 또한 '글자'를 사용합니다. 글자는 우리의 언어 수단이므로,
        컴퓨터에서 글자를 사용하지 못했다면 컴퓨터는 단순 계산기에 불과했을
        것입니다. 모두가 알고 있듯이 컴퓨터는 0과 1, 즉 2진수를 사용하여 정보를
        저장하는데요, 우리가 사용하는 글자를 어떻게 이진수로 표현할 수 있을까요?
      </p>
      <p className='mt-6'>
        이를 해결하기 위한 매인 아이디어는 각 글자에 숫자 코드를 부여하는
        것입니다. 예컨대 '안'이라는 글자에 0, '녕'이라는 글자에 1라는 코드를
        할당해줍시다. '안녕'을 코드로 나타낸다면, '01'과 같이 표현할 수 있겠죠?
        이러한 과정을 통해 컴퓨터는 글자를 이진수로 저장합니다. 하지만 친구의
        컴퓨터는 다른 코드를 사용한다고 가정해 봅시다. 저는 친구에게
        '안녕'이라는 글을 보내고 싶어서 코드 '01'을 친구 컴퓨터에 보냈는데, 친구
        컴퓨터에서 코드 '01'은 '한국'이라는 글자로 변환되면 어떨까요? 많이
        곤란할 것입니다. 그래서 사람들은 이러한 혼란을 방지하기 위해, 표준
        코드를 만들었습니다. 이러한 표준 코드의 대표적인 예시 '아스키코드'와
        '유니코드'에 대하여 알아봅시다.
      </p>
      <SubTitle subTitle='아스키코드 (ASCII Code)' />
      <p>
        아스키코드 (American Standard Code for Information Interchange, ASCII)는
        1963년에 미국 표준 협회에서 만든 표준 코드입니다. 아스키코드는 글자
        1개를 나타내기 위해 패리티 비트 1개와 글자를 나타내는 7비트를 사용하여
        8비트로 나타냅니다. 글자를 나타내는 비트가 7비트이므로, 총{' '}
        <InlineMath>2^7</InlineMath>개의 글자를 나타낼 수 있습니다. 아래{' '}
        <ColorLink
          target='_blink'
          href='https://commons.wikimedia.org/wiki/File:USASCII_code_chart.png'
        >
          위키피디아
        </ColorLink>
        에서 가져온 아스키코드표가 있습니다.
      </p>
      <ImageBox
        className='my-8 mx-auto max-w-[500px]'
        alt='ascii-code-chart'
        imgSrc='/images/paper/ascii-code/ASCII_code_chart.png'
      />
      <p>
        'A'의 열은 '100'이며, 행은 '0001'입니다. 이는 이진수 값이며, 열의 값을
        먼저 적습니다. 즉 'A'는 ASCII 코드로 표현하면 1000001이며, 이를 10진수로
        표현하면 65가 됩니다.
      </p>
      <p>
        패리티 비트는 오류를 검출하기 위해 사용됩니다. 비트 1개를 나타내는
        트랜지스터의 크기가 작아지며 터널링 효과 등으로 인해 비트의 값이 변형될
        수 있는데, 이는 컴퓨터 연산에 오류를 야기할 수 있습니다. 이를 예방하기
        위해 오류 검출 비트, 즉 패리티 비트가 필요합니다. 패리티 비트의 주된
        아이디어는 1의 개수가 홀수인지, 아니면 짝수인지 판별하는 것입니다.
        예컨대 위에서 예로 든 'A'(1000001)의 경우 1의 개수가 2개, 즉
        짝수개입니다. 이는 짝수 패리티에서 1로 표현됩니다. 즉 'A'를 패리티
        비트를 포함하여 아스키코드로 표현하면 11000001입니다. 'C'(1000011)의
        경우 1의 개수가 홀수개이므로 패리티 비트는 0이며, 01000011으로
        표현됩니다. 만약 들어온 데이터의 패리티 비트가 1인데, 1의 개수가
        홀수라면 오류가 있음을 판별할 수 있습니다.
      </p>
      <p className='mt-6'>
        아스키코드에 대하여 알아보았습니다. 아래 문자의 아스키 코드를 확인할 수
        있는 오브젝트를 만들어 두었습니다. 확인해 보세요!
      </p>
      <Box>⚠️ 아스키코드에 존재하는 글자만을 적을 수 있습니다.</Box>
      <div className='px-auto mb-8 flex flex-col items-center'>
        <input
          type='text'
          value={asciiBoxText}
          onChange={(e) => {
            if (isAscii(e.target.value)) setAsciiBoxText(e.target.value);
          }}
          className='rounded-lg bg-transparent'
        />
        <p className='mt-3 px-16 text-center'>{asciiBoxTextAscii}</p>
      </div>
      <SubTitle subTitle='유니코드 (UNI Code)' />
      <p>
        아스키코드에는 치명적인 약점이 있습니다. 바로 미국 표준, 즉 영어가 아닌
        다른 언어를 사용하기 어렵다는 점입니다. 만약 컴퓨터로 한글을 사용하지
        못한다면, 한국인이 우리에게 매우 불편하겠죠? 이러한 문제를 해결하기 위해
        유니코드 (UNI Code)를 만들었습니다. UNI 코드는 아스키코드와 다르게
        8비트가 아닌 8비트에서 32비트를 (UTF-8 기준) 사용합니다. 즉, 최대{' '}
        <InlineMath>2^32</InlineMath>개의 문자를 저장할 수 있습니다.
        어머어마하게 큰 값이지요? 따라서 아스키코드와 달리 영어만 사용할 수 있는
        것이 아닌 세계 각국의 언어 및 기호를 사용할 수 있습니다.
      </p>
    </Paper>
  );
}
