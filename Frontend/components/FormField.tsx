import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormField = ({
  title = "",
  value,
  placeholder = "",
  handleChangeText = () => {},
  otherStyles = "",
  titleStyles = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-m ${titleStyles} font-medium`}>{title}</Text>

      <View className="w-full h-12 px-4 bg-[#F2F4F7] rounded-xl border-2 border-gray-100 flex flex-row items-center">
        <TextInput
          className="flex-1 text-gray-500 font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#d1d5db"
          onChangeText={handleChangeText}
          secureTextEntry={
            ((title === "Password" || title === "Парола") && !showPassword) ||
            ((title === "Confirm Password" || title === "Потвърди Паролата") &&
              !showPassword)
          }
          {...props}
        />

        {title === "Password" ||
          (title === "Парола" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  !showPassword
                    ? require("./../assets/images/eye.png")
                    : require("./../assets/images/eye-hide.png")
                }
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        {title === "Confirm Password" ||
          (title === "Потвърди Паролата" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  !showPassword
                    ? require("./../assets/images/eye.png")
                    : require("./../assets/images/eye-hide.png")
                }
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default FormField;
