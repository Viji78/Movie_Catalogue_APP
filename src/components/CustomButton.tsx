// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// interface CustomButtonProps {
//   title: string;
//   onPress: () => void;
//   type?: 'primary' | 'secondary'; // primary = blue, secondary = green
//   style?: ViewStyle;
//   textStyle?: TextStyle;
//   disabled?: boolean;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   title,
//   onPress,
//   type = 'primary',
//   style,
//   textStyle,
//   disabled = false,
// }) => {
//   const backgroundColor = type === 'primary' ? '#007AFF' : '#4CD964';

//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         { backgroundColor: disabled ? '#ccc' : backgroundColor },
//         style,
//       ]}
//       onPress={onPress}
//       disabled={disabled}
//     >
//       <Text style={[styles.text, textStyle]}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 4,
//     flex: 1,
//   },
//   text: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });

// export default CustomButton;






import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'danger'; // Different color types if needed
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const backgroundColor =
    disabled
      ? '#ccc'
      : type === 'secondary'
      ? '#4CD964'
      : type === 'danger'
      ? '#FF3B30'
      : '#007AFF';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
