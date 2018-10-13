import React from 'react';

const AnimalList = ({ animals }) => {
  if (!animals) {
    return null;
  }
  return (
    <table>
      <tbody>
        {animals.map(({ name, emoji }) => (
          <tr key={name}>
            <td>{name} {emoji}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalList;
