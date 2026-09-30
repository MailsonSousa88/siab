import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { useLoginViewModel } from "@/viewmodel/useLoginViewModel";
import { Color } from "expo-router";

const Login = () => {
  const [loginState, loginActions] = useLoginViewModel();
  return (
    <View style={loginStyles.loginContainer}>
      <View style={loginStyles.loginCard}>
        <View style={loginStyles.loginHeader}>
          <Ionicons name="library" size={42} color="#1e3a8a" />

          <View>
            <Text style={loginStyles.loginTitle}>SIAB</Text>
            <Text style={loginStyles.loginSubtitle}>
              SISTEMA GERENCIADOR DA BIBLIOTECA
            </Text>
          </View>
        </View>

        <View style={loginStyles.loginInfoCard}>
          <View style={loginStyles.loginInfoTitleContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#075985"
            />

            <Text style={loginStyles.loginInfoCardTitle}>
              Problemas com acesso?
            </Text>
          </View>

          <Text style={loginStyles.loginInfoCardText}>
            e-mail: siab@support.com.br
          </Text>
        </View>

        <View style={loginStyles.loginFormsContainer}>
          <View style={loginStyles.loginFieldContainer}>
            <View style={loginStyles.loginField}>
              <Ionicons name="mail-outline" size={20} color="#262626" />
              <Text style={loginStyles.loginLabel}>E-mail</Text>
            </View>

            <TextInput
              style={loginStyles.loginInput}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={loginState.email}
              onChangeText={loginActions.alterarEmail}
            />

            <Text style={loginStyles.loginHelperText}>
              Digite o e-mail cadastrado
            </Text>
          </View>

          <View style={loginStyles.loginFieldContainer}>
            <View style={loginStyles.loginField}>
              <Ionicons name="lock-closed-outline" size={20} color="#262626" />
              <Text style={loginStyles.loginLabel}>PIN de acesso</Text>
            </View>

            <TextInput
              style={loginStyles.loginInput}
              placeholder="Digite seu PIN"
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
              value={loginState.pin?.toString() ?? ""}
              onChangeText={loginActions.alterarPin}
            />

            <Text style={loginStyles.loginHelperText}>
              PIN de acesso com 4 dígitos
            </Text>
          </View>

          {loginState.error && (
            <Text style={loginStyles.loginError}>{loginState.error}</Text>
          )}

          <Pressable
            style={loginStyles.loginButton}
            onPress={loginActions.entrar}
          >
            {loginState.loading ? (
              <ActivityIndicator size={"large"} color={"#e6e4fc"} />
            ) : (
              <>
                <Ionicons name="arrow-forward" size={24} color="#ffffff" />
                <Text style={loginStyles.loginButtonText}>Entrar</Text>
              </>
            )}
          </Pressable>
        </View>

        <View style={loginStyles.loginFooter}>
          <Ionicons name="information-circle" size={17} color="#737373" />

          <Text style={loginStyles.loginFooterText}>
            Acesso exclusivo para usuários cadastrados
          </Text>
        </View>
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#1e3a8a",
    justifyContent: "center",
    alignItems: "center",
  },

  loginCard: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 28,
  },

  loginHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  loginTitle: {
    color: "#1e3a8a",
    fontSize: 32,
    fontWeight: "bold",
  },

  loginSubtitle: {
    color: "#525252",
    fontSize: 11,
    fontWeight: "bold",
  },

  loginInfoCard: {
    backgroundColor: "#c3e2f7",
    borderWidth: 1,
    borderColor: "#7dd3fc",
    borderRadius: 6,
    padding: 16,
    marginBottom: 24,
  },

  loginInfoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },

  loginInfoCardTitle: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginInfoCardText: {
    color: "#0369a1",
    fontSize: 14,
    marginLeft: 28,
  },

  loginFormsContainer: {
    gap: 20,
  },

  loginFieldContainer: {
    gap: 7,
  },

  loginField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  loginLabel: {
    color: "#262626",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginInput: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 7,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "100",
    backgroundColor: "#ffffff",
  },

  loginHelperText: {
    color: "#737373",
    fontSize: 13,
  },

  loginButton: {
    height: 56,
    backgroundColor: "#1e3a8a",
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 28,
  },

  loginFooterText: {
    color: "#737373",
    fontSize: 13,
  },
  loginError: {
    color: "#dc2626",
    fontSize: 13,
    textAlign: "center",
  },
});

export default Login;
