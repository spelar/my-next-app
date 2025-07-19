"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error("API URL이 설정되지 않았습니다. 환경변수를 확인하세요.");
}

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.email || !form.password || !form.name) {
      setError("모든 필드를 입력해 주세요.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if (form.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "회원가입에 실패했습니다.");
      } else {
        setSuccess("회원가입이 완료되었습니다! 로그인해 주세요.");
        setForm({ email: "", password: "", name: "" });
      }
    } catch (err) {
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <Card style={{ width: 400, maxWidth: "90%" }}>
        <CardContent style={{ padding: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center", color: "#222" }}>회원가입</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="홍길동"
                autoComplete="name"
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호 (6자 이상)"
                autoComplete="new-password"
                required
              />
            </div>
            {error && <div style={{ color: "#e11d48", fontSize: 14, textAlign: "center" }}>{error}</div>}
            {success && <div style={{ color: "#059669", fontSize: 14, textAlign: "center" }}>{success}</div>}
            <Button type="submit" disabled={loading} style={{ fontWeight: 700, fontSize: 16 }}>
              {loading ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 