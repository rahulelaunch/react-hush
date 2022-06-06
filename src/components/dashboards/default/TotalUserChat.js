
import FalconComponentCard from 'components/common/FalconComponentCard';
import { chartJsDefaultTooltip } from 'helpers/chartjs-utils';
import { getColor, rgbaColor } from 'helpers/utils';
import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const TotalUserChat = ({ data1 }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '# of Users',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          rgbaColor(getColor('secondary'), 0.2),
          rgbaColor(getColor('warning'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('success'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('primary'), 0.2)
        ],
        borderColor: [
          getColor('secondary'),
          getColor('warning'),
          getColor('info'),
          getColor('success'),
          getColor('info'),
          getColor('primary')
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: chartJsDefaultTooltip()
    },
    scales: {
      x: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1)
        }
      },
      y: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1),
          drawBorder: true
        }
      }
    }
  };

  return (
    <FalconComponentCard>
      <FalconComponentCard.Header title="Users Chart" light={false} />
      <FalconComponentCard.Body>
        <Bar
          data={data}
          options={options}
          height={1000}
          width={1618}
        />
      </FalconComponentCard.Body>
    </FalconComponentCard>
  );
}

TotalUserChat.propTypes = {
  data1: PropTypes.number.isRequired,
};

export default TotalUserChat;

